export type Repository = {
  name: string;
  htmlUrl: string;
  description: string;
  numberOfStars: number;
};

export function isRepository(
  repositoryCandidate: unknown,
): repositoryCandidate is Repository {
  return (
    typeof repositoryCandidate === "object" &&
    repositoryCandidate !== null &&
    typeof (repositoryCandidate as any).name === "string" &&
    typeof (repositoryCandidate as any).htmlUrl === "string" &&
    typeof (repositoryCandidate as any).description !== "undefined" &&
    typeof (repositoryCandidate as any).numberOfStars === "number"
  );
}
