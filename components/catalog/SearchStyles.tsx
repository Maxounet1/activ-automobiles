export const BRAND_COLOR = '#1A3F6F';

export const searchEngineStyles = `
  .se-field-btn {
    position: relative;
    overflow: hidden;
  }
  .se-field-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  .se-field-btn:hover::before {
    opacity: 1;
  }
  .se-chip {
    position: relative;
    overflow: hidden;
  }
  .se-chip::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%);
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
  }
  .se-chip:hover::before {
    opacity: 1;
  }
  .se-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #1A3F6F;
    box-shadow: 0 2px 8px rgba(26,63,111,0.25), 0 0 0 3px rgba(26,63,111,0.08);
    cursor: pointer;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }
  .se-range::-webkit-slider-thumb:hover {
    box-shadow: 0 4px 12px rgba(26,63,111,0.35), 0 0 0 4px rgba(26,63,111,0.12);
    transform: scale(1.1);
  }
`;
