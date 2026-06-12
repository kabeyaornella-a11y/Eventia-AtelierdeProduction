/**
 * Génère une URL de QR code via un service public (pas de bundle natif requis).
 * Utilisé pour les invitations et les pages live.
 */
export function buildQrUrl(target: string, size = 480): string {
  const encoded = encodeURIComponent(target);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encoded}`;
}
