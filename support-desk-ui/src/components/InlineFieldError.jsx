export default function InlineFieldError({ message }) {
  if (!message) {
    return null;
  }

  return <span className="field-error" role="alert">{message}</span>;
}
