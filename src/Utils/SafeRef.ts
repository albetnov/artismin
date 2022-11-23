export default function safeRef<T extends HTMLInputElement | HTMLTextAreaElement>(
  ref: React.RefObject<T>
) {
  const result = ref.current!.value;
  if (result && result.trim() !== "") {
    return result;
  }
  return null;
}
