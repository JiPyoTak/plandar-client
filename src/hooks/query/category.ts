import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createCategoryAPI,
  deleteCategoryAPI,
  getCategoryAPI,
  updateCategoryAPI,
} from '@/apis/category';
import { CATEGORY_KEY } from '@/constants/rqKeys';
import { ICategory, ICategoryWithoutId } from '@/types/query/category';

// 카테고리 캐싱을 위한 키
const KEY = [CATEGORY_KEY];
const useCategoryQuery = () => {
  const queryClient = useQueryClient();

  return useQuery<ICategory[]>([CATEGORY_KEY], getCategoryAPI, {
    staleTime: 1000 * 60 * 60 * 24,
    onSuccess(data) {
      data.forEach((category) => {
        queryClient.setQueryData([CATEGORY_KEY, { id: category.id }], category);
      });
    },
  });
};

// 카테고리 추가
const useCategoryCreate = () => {
  const queryClient = useQueryClient();
  let id = 0;

  return useMutation(
    // api 호출
    createCategoryAPI,
    {
      onMutate: async (newCategory: ICategoryWithoutId) => {
        // 실패했을 때 복구를 위한 기존 캐시 데이터 가져오기
        const previousCategories = queryClient.getQueryData<ICategory[]>(KEY);

        // 낙관적 업데이트를 위한 새로운 데이터 캐싱
        queryClient.setQueryData<ICategory[]>([CATEGORY_KEY], (old) => [
          ...(old ?? []),
          { ...newCategory, id: --id },
        ]);

        // onError의 context에 들어갈 값
        return { previousCategories, id };
      },
      // 에러 발생시 원래 캐싱된 데이터로 복구
      onError: (err, newCategory, context) => {
        queryClient.setQueryData<ICategory[]>(
          [CATEGORY_KEY],
          context?.previousCategories ?? [],
        );
      },
      onSuccess: (data, _, context) => {
        queryClient.setQueryData([CATEGORY_KEY, { id: data.id }], data);
        queryClient.setQueryData<ICategory[]>([CATEGORY_KEY], (oldData) => {
          return [
            ...(oldData?.filter((category) => category.id !== context?.id) ??
              []),
            data,
          ];
        });
      },
    },
  );
};

const useCategoryUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(
    // api 호출
    updateCategoryAPI,
    {
      onMutate: async (newCategory: ICategory) => {
        const id = newCategory.id;
        // 실패했을 때 복구를 위한 기존 캐시 데이터 가져오기
        const previousCategory = queryClient.getQueryData<ICategory>([
          CATEGORY_KEY,
          { id },
        ]);

        // 낙관적 업데이트를 위한 새로운 데이터 캐싱
        queryClient.setQueryData([CATEGORY_KEY, { id }], newCategory);
        queryClient.setQueryData<ICategory[]>([CATEGORY_KEY], (old) => {
          const newCategories = [...(old ?? [])];
          const index = newCategories.findIndex(
            (category) => category.id === newCategory.id,
          );
          newCategories[index] = newCategory;

          return newCategories;
        });

        // onError의 context에 들어갈 값
        return { previousCategory };
      },
      // 에러 발생시 원래 캐싱된 데이터로 복구
      onError: (err, newCategory, context) => {
        const previousCategory = context?.previousCategory;
        if (!previousCategory) return;

        const id = previousCategory.id;
        queryClient.setQueryData([CATEGORY_KEY, { id }], previousCategory);
        queryClient.setQueryData<ICategory[]>([CATEGORY_KEY], (old) => {
          const previousCategories = [...(old ?? [])];
          const index = previousCategories.findIndex(
            (category) => category.id === newCategory.id,
          );
          previousCategories[index] = previousCategory;

          return previousCategories;
        });
      },
    },
  );
};

const useCategoryDelete = () => {
  const queryClient = useQueryClient();

  return useMutation(
    // api 호출
    deleteCategoryAPI,
    {
      onMutate: async (targetCategory: ICategory) => {
        const id = targetCategory.id;

        // 실패했을 때 복구를 위한 기존 캐시 데이터 가져오기
        const previousCategory = queryClient.getQueryData<ICategory>([
          CATEGORY_KEY,
          { id },
        ]);

        // 낙관적 업데이트를 위한 새로운 데이터 캐싱
        queryClient.removeQueries([CATEGORY_KEY, { id }]);
        queryClient.setQueryData<ICategory[]>([CATEGORY_KEY], (old) => {
          const newCategories = [...(old ?? [])];

          return newCategories.filter(
            (category) => category.id !== targetCategory.id,
          );
        });

        // onError의 context에 들어갈 값
        return { previousCategory };
      },
      // 에러 발생시 원래 캐싱된 데이터로 복구
      onError: (err, targetCategory, context) => {
        const previousCategory = context?.previousCategory;
        if (!previousCategory) return;

        const id = previousCategory.id;
        queryClient.setQueryData([CATEGORY_KEY, { id }], previousCategory);
        queryClient.setQueryData<ICategory[]>([CATEGORY_KEY], (old) => [
          ...(old ?? []),
          previousCategory,
        ]);
      },
    },
  );
};

export {
  useCategoryQuery,
  useCategoryUpdate,
  useCategoryCreate,
  useCategoryDelete,
};
