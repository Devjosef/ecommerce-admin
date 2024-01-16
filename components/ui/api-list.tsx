"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

type ApiEndpoint = {
  title: string;
  variant: "public" | "admin";
  description: string;
};

export const ApiList: React.FC<ApiListProps> = ({ entityName, entityIdName }) => {
  const params = useParams();
  const origin = useOrigin();
  const baseUrl = `${origin}/api/${params.storeId}`;

  const apiEndpoints: ApiEndpoint[] = [
    { title: "GET", variant: "public", description: `${baseUrl}/${entityName}` },
    { title: "GET", variant: "public", description: `${baseUrl}/${entityName}/{${entityIdName}}` },
    { title: "POST", variant: "admin", description: `${baseUrl}/${entityName}` },
    { title: "PATCH", variant: "admin", description: `${baseUrl}/${entityName}/{${entityIdName}}` },
    { title: "DELETE", variant: "admin", description: `${baseUrl}/${entityName}/{${entityIdName}}` },
  ];

  return (
    <>
      {apiEndpoints.map((endpoint, index) => (
        <ApiAlert key={index} {...endpoint} />
      ))}
    </>
  );
};
