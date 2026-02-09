import { useEffect } from "react";
import { useRouter } from "expo-router";
import { checkToken } from "./src/services/authService";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await checkToken();

      if (valid) {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/login");
      }
    };

    checkAuth();
  }, []);

  return null;
}
