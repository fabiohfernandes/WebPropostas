// ============================================================================
// Template Builder - Elements Panel (Session-based)
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useBuilderStore } from '@/store/builder';
import { DrawingSession } from './sessions/DrawingSession';
import { TextSessionEnhanced } from './sessions/TextSessionEnhanced';
import { IconsSessionEnhanced } from './sessions/IconsSessionEnhanced';
import { FramesSessionEnhanced } from './sessions/FramesSessionEnhanced';
import { ImagesSession } from './sessions/ImagesSession';
import { VideoSessionEnhanced } from './sessions/VideoSessionEnhanced';
import { IndividualBulletsSession } from './sessions/IndividualBulletsSession';
import { BulletSetsSession } from './sessions/BulletSetsSession';
import { AISessionEnhanced } from './sessions/AISessionEnhanced';
import { ColorsSessionEnhanced } from './sessions/ColorsSessionEnhanced';
import { EffectsSession } from './sessions/EffectsSession';

export function ElementsPanelNew() {
  const { activeSession } = useBuilderStore();

  const renderSession = () => {
    switch (activeSession) {
      case 'drawing':
        return <DrawingSession />;
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
      case 'colors':
        return <ColorsSessionEnhanced />;
      case 'effects':
        return <EffectsSession />;
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
