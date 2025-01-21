export function bufferToBase64(buffer: Buffer, mimeType: string = 'image/jpeg'): string {
   return `data:${mimeType};base64,${buffer.toString('base64')}`;
}