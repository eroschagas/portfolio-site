import { CollectionRepository } from "~/services/CollectionRepository";

export const useCollections = () => {
  const { t } = usePortfolio();
  const repository = new CollectionRepository();
  const categories = computed(() => repository.getCategories(t.value));
  return { categories };
};
