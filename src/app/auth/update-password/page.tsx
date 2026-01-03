import AuthLayout from "../_components/auth-layout";
import { UpdatePasswordForm } from "../_components/update-password-form";

export default function LoginPage() {
  return (
    <AuthLayout>
      <UpdatePasswordForm />
    </AuthLayout>
  );
}
