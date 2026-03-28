import { QRCodeSVG } from 'qrcode.react';

/**
 * QR Code display component
 * @param {string} url - The URL to encode
 * @param {number} size - Size in pixels
 * @param {string} fgColor - Foreground color
 * @param {string} bgColor - Background color
 */
export default function QRCodeDisplay({
  url,
  size = 160,
  fgColor = '#ffffff',
  bgColor = 'transparent',
  className = '',
  showLabel = true,
}) {
  if (!url) return null;

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="p-3 rounded-xl bg-white shadow-lg">
        <QRCodeSVG
          value={url}
          size={size}
          fgColor="#0a0a0f"
          bgColor="#ffffff"
          level="M"
          includeMargin={false}
        />
      </div>
      {showLabel && (
        <p className="text-[10px] text-[#8b929e] uppercase tracking-widest font-medium">
          Scan to view card
        </p>
      )}
    </div>
  );
}
