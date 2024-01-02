import { Repository } from "../gitHub/repository";

export type RepositoryStorage = {
  storeRepository: (repository: Repository) => void;
  loadRepositories: () => Repository[];
};
