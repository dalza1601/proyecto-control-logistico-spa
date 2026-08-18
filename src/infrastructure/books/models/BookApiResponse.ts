export interface BookApiResponse {
  id: string;
  title: string;
  description: string | null;
  createdAtUtc: string;
  updatedAtUtc: string;
}
