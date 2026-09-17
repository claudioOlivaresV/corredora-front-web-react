interface Props {
  errorMessage: string;
}

export default function ErrorMessage({ errorMessage }: Props) {
  return (
    <div className="rounded bg-error/10 px-4 py-3 text-sm font-medium text-error">
      {errorMessage}
    </div>
  );
}
