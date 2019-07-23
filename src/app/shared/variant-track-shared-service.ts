export const PIN_COLOR = '#004D95';
export const PIN_SELECTED_COLOR = '#00aedb';
export const OVERLAY_COLOR = '#D54A0F';

export type GenomeBrowserOverlay = 'None' | 'Homozygotes' | 'Heterozygotes' | 'DbSNP';

export class VariantTrackSharedService {
    setOverlay(overlay: GenomeBrowserOverlay, overlayMap, pinFeature, track, activeOverlay) {
        if (overlayMap.has(overlay)) {
            overlayMap.get(overlay)(pinFeature);
            pinFeature.reset.apply(track);
            pinFeature.update.apply(track);
            activeOverlay = overlay;
        }
    }

    getOverlay(activeOverlay) {
        return activeOverlay;
    }
}