import { TriangleAlertIcon } from "lucide-react";

type Props = {
  message: string | undefined;
};

function FormError({ message }: Props) {
  if (!message) return null;

  return (
    <section className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <TriangleAlertIcon className="w-4 h-4" />
      <p>{message}</p>
    </section>
  );
}

export default FormError;
