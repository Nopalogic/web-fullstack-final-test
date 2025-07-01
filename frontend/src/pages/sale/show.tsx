import { useState } from "react";
import { useParams } from "react-router";

import { Main } from "@/components/dashboard/main";

import { Sale } from "@/types/sales";

export default function SalesShow() {
  const [sale, setSale] = useState<Sale | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  return <Main></Main>;
}
