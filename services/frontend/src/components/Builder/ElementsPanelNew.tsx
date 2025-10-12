// ============================================================================
// Template Builder - Elements Panel (Session-based)
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useBuilderStore } from '@/store/builder';
import { TemplatesSession } from './sessions/TemplatesSession';
import { TextSessionEnhanced } from './sessions/TextSessionEnhanced';
import { IconsSessionEnhanced } from './sessions/IconsSessionEnhanced';
import { FramesSessionEnhanced } from './sessions/FramesSessionEnhanced';
import { ImagesSession } from './sessions/ImagesSession';
import { VideoSessionEnhanced } from './sessions/VideoSessionEnhanced';
import { IndividualBulletsSession } from './sessions/IndividualBulletsSession';
import { BulletSetsSession } from './sessions/BulletSetsSession';
import { AISessionEnhanced } from './sessions/AISessionEnhanced';
import { TipsSession } from './sessions/TipsSession';

export function ElementsPanelNew() {
  const { activeSession } = useBuilderStore();

  const renderSession = () => {
    switch (activeSession) {
      case 'templates':
        return <TemplatesSession />;
      case 'text':
        return <TextSessionEnhanced />;
      case 'icons':
        return <IconsSessionEnhanced />;
      case 'frames':
        return <FramesSessionEnhanced />;
      case 'images':
        return <ImagesSession />;
      case 'videos':
        return <VideoSessionEnhanced />;
      case 'bullets-individual':
        return <IndividualBulletsSession />;
      case 'bullets-sets':
        return <BulletSetsSession />;
      case 'ai':
        return <AISessionEnhanced />;
      case 'tips':
        return <TipsSession />;
      default:
        return <TextSessionEnhanced />;
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {renderSession()}
    </div>
  );
}
