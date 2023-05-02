import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createCategoryAPI,
  getCategoryAPI,
  updateCategoryAPI,
} from '@/apis/category';
import { ICategory, ICategoryWithoutId } from '@/types/rq/category';
import { CATEGORY_KEY } from '@/utils/rqKeys';

// 카테고리 캐싱을 위한 키
const KEY = [CATEGORY_KEY];
const useCategoryQuery = () => useQuery(KEY, getCategoryAPI);

// 카테고리 추가
const useCategoryCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(
    // api 호출
    (newCategory: ICategoryWithoutId) => createCategoryAPI(newCategory),
    {
      onMutate: async (newCategory: ICategoryWithoutId) => {
        // 기존 캐싱된 데이터 무효화
        await queryClient.cancelQueries(KEY);

        // 실패했을 때 복구를 위한 기존 캐시 데이터 가져오기
        const previousCategories = queryClient.getQueryData<ICategory[]>(KEY);

        // 낙관적 업데이트를 위한 새로운 데이터 캐싱
        // id는 임의로 -1로 설정
        queryClient.setQueryData<ICategory[]>(KEY, (old) => [
          ...(old ?? []),
          { ...newCategory, id: -1 },
        ]);

        // onError의 context에 들어갈 값
        return { previousCategories };
      },
      // 에러 발생시 원래 캐싱된 데이터로 복구
      onError: (err, newCategory, context) => {
        queryClient.setQueryData<ICategory[]>(
          KEY,
          context?.previousCategories ?? [],
        );
      },
      // 성공했을 때 (새 카테고리의 id를 알기 위해) 캐싱된 데이터 무효화 -> useQuery의 refetch
      onSettled: () => {
        queryClient.invalidateQueries(KEY);
      },
    },
  );
};

const useCategoryUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(
    // api 호출
    (newCategory: ICategory) => updateCategoryAPI(newCategory),
    {
      onMutate: async (newCategory: ICategory) => {
        // 기존 캐싱된 데이터 무효화
        await queryClient.cancelQueries(KEY);

        // 실패했을 때 복구를 위한 기존 캐시 데이터 가져오기
        const previousCategories = queryClient.getQueryData<ICategory[]>(KEY);

        // 낙관적 업데이트를 위한 새로운 데이터 캐싱
        queryClient.setQueryData<ICategory[]>(KEY, (old) => {
          const newCategories = [...(old ?? [])];
          const index = newCategories.findIndex(
            (category) => category.id === newCategory.id,
          );
          newCategories[index] = newCategory;
          return newCategories;
        });

        // onError의 context에 들어갈 값
        return { previousCategories };
      },
      // 에러 발생시 원래 캐싱된 데이터로 복구
      onError: (err, newCategory, context) => {
        queryClient.setQueryData<ICategory[]>(
          KEY,
          context?.previousCategories ?? [],
        );
      },
      // Update 성공시 캐싱된 데이터를 무효화할 필요 없다고 판단하여 onSettled 작성하지 않음
    },
  );
};

export { useCategoryQuery, useCategoryUpdate, useCategoryCreate };
