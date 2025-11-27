import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { uploadLogo, uploadBanner, fileToDataUrl, ImageUploadResponse, fetchImageHistory } from '../../services/imageService';
import { Upload, Trash2, Loader, RefreshCw } from 'lucide-react';

/**
 * URL Conversion Page Component - Dual Image Upload
 * Top: Circular Logo Upload (Profile-like) | Bottom: Banner Upload
 * Central: Save Button to save both
 */

// ============================================================================
// STYLED COMPONENTS - Layout
// ============================================================================

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 1rem; */
  overflow-y: hidden;
`;

const ContentWrapper = styled.div`
  width: 100%;
  /* max-width: 1400px; */
  display: flex;
  /* grid-template-columns: 1fr 1fr; */
  gap: 1.5rem;
  align-items: flex-start;
  height: 100vh;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    max-width: 600px;
    gap: 1rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  /* justify-content: space-around; */
  overflow-y: auto;
  height: 100vh;
  /* padding-right: 0.5rem;
  padding-top: 5rem; */
  padding: 5rem;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  flex: 1.4;
  position: relative;
  /* padding: 1rem 0.5rem 0 0.5rem; */
  

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

const LuminateLogo = styled.img`
  position: absolute;
  top: -1.5rem;
  left: 0.5rem;
  width: 110px;
  height: 110px;
  object-fit: contain;
  opacity: 0.95;
  z-index: 10;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  max-height: 100vh;
  padding-right: 0.5rem;
  padding-top: 2rem;
  flex: 0.5;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

// ============================================================================
// STYLED COMPONENTS - Logo Section
// ============================================================================

const UploadContainer = styled.div`
  display: flex;
  gap: 13rem;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
  flex-wrap: nowrap;
  margin-top: 5rem;
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: auto;
  max-width: 200px;
  flex-shrink: 0;
`;

const BannerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: auto;
  max-width: 320px;
  flex-shrink: 0;
`;

const RefreshButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
`;

const RefreshButton = styled.button`
  background: rgba(100, 200, 150, 0.25);
  border: 1px solid rgba(100, 200, 150, 0.6);
  color: rgba(150, 255, 200, 1);
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.4s ease;
  }

  &:hover {
    background: rgba(100, 200, 150, 0.4);
    border-color: rgba(100, 200, 150, 1);
    color: rgba(200, 255, 230, 1);
    
    svg {
      transform: rotate(180deg);
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

const LogoHeader = styled.div`
  text-align: center;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  h2 {
    margin: 0 0 0.35rem 0;
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffffff;
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    opacity: 1;
    color: rgba(255, 255, 255, 0.95);
  }
`;

const CircularDropZone = styled.div<{ isDragOver: boolean; hasImage: boolean }>`
  position: relative;
  width: 140px;
  height: 140px;
  border: 2px dashed ${props => props.isDragOver ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.4)'};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.isDragOver ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &:hover {
    border-color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 36px;
    height: 36px;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const CircularPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 100, 100, 0.8);
  border: 2px solid white;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 100, 100, 1);
    transform: scale(1.1);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.9);

  svg {
    animation: spin 1s linear infinite;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 500;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// ============================================================================
// STYLED COMPONENTS - Banner Section
// ============================================================================

const BannerHeader = styled.div`
  text-align: center;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  h2 {
    margin: 0 0 0.35rem 0;
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffffff;
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    opacity: 1;
    color: rgba(255, 255, 255, 0.95);
  }
`;

const BannerDropZone = styled.div<{ isDragOver: boolean; hasImage: boolean }>`
  border: 2px dashed ${props => props.isDragOver ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.4)'};
  padding: ${props => props.hasImage ? '0' : '1rem'};
  text-align: center;
  transition: all 0.3s ease;
  background: ${props => props.isDragOver ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
  cursor: pointer;
  height: 140px;
  width: 280px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  &:hover {
    border-color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const BannerPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: 280px;
  max-height: 140px;
`;

const BannerUploadContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  width: 100%;

  svg {
    width: 28px;
    height: 28px;
    color: rgba(255, 255, 255, 0.8);
  }

  h3 {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.7rem;
    opacity: 0.9;
  }
`;

// ============================================================================
// STYLED COMPONENTS - History Section (Right Side)
// ============================================================================

const HistorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 0.5rem 0;
  padding: 0 0.75rem;
`;

const HistoryTitle = styled.h3`
  margin: 0;
  color: white;
  font-size: 1rem;
  font-weight: 700;
`;

const HistoryRefreshButton = styled.button`
  background: rgba(100, 200, 150, 0.15);
  border: 1px solid rgba(100, 200, 150, 0.4);
  color: rgba(150, 255, 200, 1);
  padding: 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(100, 200, 150, 0.3);
    border-color: rgba(100, 200, 150, 0.7);
    transform: rotate(90deg);
  }

  &:active {
    transform: rotate(90deg) scale(0.95);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 0.75rem;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

const HistoryItem = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.75rem;
  border-radius: 4px;
  display: flex;
  gap: 0.75rem;
  transition: all 0.3s ease;
  animation: slideInUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &::before {
    content: attr(data-number);
    position: absolute;
    top: -8px;
    left: 12px;
    background: rgba(100, 200, 150, 0.9);
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HistoryItemThumb = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
`;

const HistoryItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
`;

const HistoryItemType = styled.div`
  font-size: 0.65rem;
  text-transform: uppercase;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 0.2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const HistoryItemUrl = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 0.65rem;
  color: #e8f5ff;
  word-break: break-all;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.4rem;
  border-radius: 2px;
`;

const HistoryItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const HistoryActionButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  font-size: 0.75rem;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.6);
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

const EmptyHistoryMessage = styled.div`
  text-align: center;
  padding: 1.5rem 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
`;

const URLItem = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.5rem;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
  max-width: 180px;
`;

const URLLabel = styled.div`
  font-size: 0.65rem;
  color: #ffffff;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const URLText = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 0.65rem;
  color: #e8f5ff;
  word-break: break-all;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  border-radius: 0;
`;

const CopyButton = styled.button`
  background: rgba(100, 150, 255, 0.3);
  border: 1px solid rgba(100, 150, 255, 0.6);
  color: rgba(180, 200, 255, 1);
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  font-size: 0.65rem;
  transition: all 0.2s ease;
  border-radius: 0;
  font-weight: 600;
  width: 100%;

  &:hover {
    background: rgba(100, 150, 255, 0.5);
    border-color: rgba(100, 150, 255, 1);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface ImageData extends ImageUploadResponse {
  preview: string;
}

interface DualImageUpload {
  logo: ImageData | null;
  banner: ImageData | null;
}

interface HistoryEntry {
  id: string;
  type: 'logo' | 'banner';
  data: ImageData;
  timestamp: Date;
}

// ============================================================================
// COMPONENT
// ============================================================================

const URLConversion: React.FC = () => {
  const [logoLoading, setLogoLoading] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(false);
  const [logoDragOver, setLogoDragOver] = useState(false);
  const [bannerDragOver, setBannerDragOver] = useState(false);
  const [images, setImages] = useState<DualImageUpload>({ logo: null, banner: null });
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [uploadHistory, setUploadHistory] = useState<HistoryEntry[]>([]);;
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // ============================================================================
  // FETCH LATEST RESOURCES FROM DATABASE
  // ============================================================================

  const fetchLatestResources = async () => {
    try {
      const images = await fetchImageHistory();
      // Convert backend images to HistoryEntry format
      const historyEntries: HistoryEntry[] = images
        .filter((img: any) => img.type === 'logo' || img.type === 'banner')
        .map((img: any, index: number) => {
          const imageData: ImageData = {
            success: true,
            message: 'Loaded from database',
            data: {
              filename: img.filename || '',
              originalName: img.originalName || '',
              size: img.size || 0,
              mimeType: img.mimeType || '',
              uploadedAt: img.uploaded_at || new Date().toISOString(),
              url: img.url || ''
            },
            preview: img.url || ''
          };
          return {
            id: img.id ? String(img.id) : `${img.type}-${index}`,
            type: img.type as 'logo' | 'banner',
            data: imageData,
            timestamp: new Date(img.uploaded_at || Date.now())
          };
        })
        .sort((a: HistoryEntry, b: HistoryEntry) => b.timestamp.getTime() - a.timestamp.getTime());
      setUploadHistory(historyEntries);
    } catch (error) {
      console.error('Failed to fetch image history:', error);
    }
  };

  useEffect(() => {
    // Fetch on mount only
    fetchLatestResources();
  }, []);

  // ============================================================================
  // LOGO HANDLERS
  // ============================================================================

  const handleLogoDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLogoDragOver(true);
  };

  const handleLogoDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLogoDragOver(false);
  };

  const handleLogoDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLogoDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processLogoFile(files[0]);
    }
  };

  const handleLogoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      processLogoFile(files[0]);
    }
  };

  const processLogoFile = async (file: File) => {
    setLogoLoading(true);

    try {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only images are allowed.');
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('File size exceeds 10MB limit');
      }

      // Upload to server using logo endpoint
      const response = await uploadLogo(file);
      const preview = await fileToDataUrl(file);

      const newImageData: ImageData = {
        ...response,
        preview
      };

      setImages(prev => ({ ...prev, logo: newImageData }));
      setUploadHistory(prev => [
        {
          id: `logo-${Date.now()}`,
          type: 'logo',
          data: newImageData,
          timestamp: new Date()
        },
        ...prev
      ]);

      if (logoInputRef.current) {
        logoInputRef.current.value = '';
      }

      // Fetch latest resources from database to sync with other users
      setTimeout(() => fetchLatestResources(), 500);
    } catch (error: any) {
      console.error('Logo upload error:', error.message);
    } finally {
      setLogoLoading(false);
    }
  };

  // ============================================================================
  // BANNER HANDLERS
  // ============================================================================

  const handleBannerDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBannerDragOver(true);
  };

  const handleBannerDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBannerDragOver(false);
  };

  const handleBannerDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBannerDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processBannerFile(files[0]);
    }
  };

  const handleBannerFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      processBannerFile(files[0]);
    }
  };

  const processBannerFile = async (file: File) => {
    setBannerLoading(true);

    try {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only images are allowed.');
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('File size exceeds 10MB limit');
      }

      // Upload to server using banner endpoint
      const response = await uploadBanner(file);
      const preview = await fileToDataUrl(file);

      const newImageData: ImageData = {
        ...response,
        preview
      };

      setImages(prev => ({ ...prev, banner: newImageData }));
      setUploadHistory(prev => [
        {
          id: `banner-${Date.now()}`,
          type: 'banner',
          data: newImageData,
          timestamp: new Date()
        },
        ...prev
      ]);

      if (bannerInputRef.current) {
        bannerInputRef.current.value = '';
      }

      // Fetch latest resources from database to sync with other users
      setTimeout(() => fetchLatestResources(), 500);
    } catch (error: any) {
      console.error('Banner upload error:', error.message);
    } finally {
      setBannerLoading(false);
    }
  };

  // ============================================================================
  // REMOVE IMAGE HANDLERS
  // ============================================================================

  const removeLogo = () => {
    setImages(prev => ({ ...prev, logo: null }));
  };

  // ============================================================================
  // COPY TO CLIPBOARD
  // ============================================================================

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      console.error('Failed to copy URL');
    }
  };

  // ============================================================================
  // CLEAR FORM
  // ============================================================================

  const clearForm = () => {
    setImages({ logo: null, banner: null });
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
    if (bannerInputRef.current) {
      bannerInputRef.current.value = '';
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        {/* LEFT COLUMN - UPLOAD ZONES */}
        <LeftSection>
          <LuminateLogo src="/luminate-logo.png" alt="Luminate Logo" />
          
          <UploadContainer>
            {/* LOGO SECTION */}
            <LogoSection>
            <LogoHeader>
              <h2>🎯 Logo Upload</h2>
              <p>Upload a circular profile logo image</p>
            </LogoHeader>

            <CircularDropZone
              isDragOver={logoDragOver}
              hasImage={!!images.logo}
              onDragOver={handleLogoDragOver}
              onDragLeave={handleLogoDragLeave}
              onDrop={handleLogoDrop}
              onClick={() => logoInputRef.current?.click()}
            >
              {logoLoading ? (
                <LoadingSpinner>
                  <Loader size={40} />
                  <p>Uploading...</p>
                </LoadingSpinner>
              ) : images.logo ? (
                <>
                  <CircularPreview src={images.logo.preview} alt="Logo preview" />
                  <RemoveButton onClick={removeLogo} title="Remove logo">
                    <Trash2 />
                  </RemoveButton>
                </>
              ) : (
                <Upload />
              )}
              <HiddenInput
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoFileSelect}
                disabled={logoLoading}
              />
            </CircularDropZone>

            {/* LOGO URL DISPLAY - SHOWS IMMEDIATELY AFTER UPLOAD */}
            {images.logo && (
              <URLItem>
                <URLLabel>📍 Logo URL</URLLabel>
                <URLText>{images.logo.data.url}</URLText>
                <CopyButton onClick={() => copyToClipboard(images.logo!.data.url)}>
                  {copiedUrl === images.logo.data.url ? '✅ Copied!' : '📋 Copy URL'}
                </CopyButton>
              </URLItem>
            )}
          </LogoSection>

          {/* BANNER SECTION */}
          <BannerSection>
            <BannerHeader>
              <h2>🎨 Banner Upload</h2>
              <p>Upload a wide banner image</p>
            </BannerHeader>

            <BannerDropZone
              isDragOver={bannerDragOver}
              hasImage={!!images.banner}
              onDragOver={handleBannerDragOver}
              onDragLeave={handleBannerDragLeave}
              onDrop={handleBannerDrop}
              onClick={() => bannerInputRef.current?.click()}
            >
              {bannerLoading ? (
                <LoadingSpinner>
                  <Loader size={40} />
                  <p>Uploading...</p>
                </LoadingSpinner>
              ) : images.banner ? (
                <>
                  <BannerPreview src={images.banner.preview} alt="Banner preview" />
                </>
              ) : (
                <BannerUploadContent>
                  <Upload />
                  <h3>Drag and drop your banner</h3>
                  <p>or click to browse</p>
                  <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>JPG, PNG, GIF, WebP • Max 10MB</p>
                </BannerUploadContent>
              )}
              <HiddenInput
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                onChange={handleBannerFileSelect}
                disabled={bannerLoading}
              />
            </BannerDropZone>

            {/* BANNER URL DISPLAY - SHOWS IMMEDIATELY AFTER UPLOAD */}
            {images.banner && (
              <URLItem>
                <URLLabel>📍 Banner URL</URLLabel>
                <URLText>{images.banner.data.url}</URLText>
                <CopyButton onClick={() => copyToClipboard(images.banner!.data.url)}>
                  {copiedUrl === images.banner.data.url ? '✅ Copied!' : '📋 Copy URL'}
                </CopyButton>
              </URLItem>
            )}
          </BannerSection>
          </UploadContainer>

          {/* REFRESH/CLEAR BUTTON */}
          <RefreshButtonContainer>
            <RefreshButton onClick={clearForm} title="Clear all uploads and reset form">
              <RefreshCw />
              Clear All
            </RefreshButton>
          </RefreshButtonContainer>
        </LeftSection>

        {/* RIGHT COLUMN - UPLOAD HISTORY */}
        <RightSection>
          <HistorySection>
            <HistoryHeader>
              <HistoryTitle>📋 Upload History</HistoryTitle>
              <HistoryRefreshButton onClick={fetchLatestResources} title="Refresh history">
                <RefreshCw />
              </HistoryRefreshButton>
            </HistoryHeader>
            <HistoryContainer>
              {uploadHistory.length > 0 ? (
                uploadHistory.map((item, index) => (
                  <HistoryItem key={item.id} data-number={`${uploadHistory.length - index}`}>
                    {/* <HistoryItemThumb src={item.data.preview} alt={item.type} /> */}
                    <HistoryItemContent>
                      <HistoryItemType>{item.type === 'logo' ? '🎯 Logo' : '🎨 Banner'}</HistoryItemType>
                      <HistoryItemUrl title={item.data.data.url}>
                        {item.data.data.url}
                      </HistoryItemUrl>
                    </HistoryItemContent>
                  </HistoryItem>
                ))
              ) : (
                <EmptyHistoryMessage>No uploads yet. Start by uploading a logo or banner!</EmptyHistoryMessage>
              )}
            </HistoryContainer>
          </HistorySection>
        </RightSection>
      </ContentWrapper>
    </PageContainer>
  );
};

export default URLConversion;
