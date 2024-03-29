import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createCategoryAPI,
  deleteCategoryAPI,
  getCategoryAPI,
  updateCategoryAPI,
} from '@/apis/category';
import { QUERY_KEY } from '@/constants/queryKey';
import { ICategory, ICategoryWithoutId } from '@/types/query/category';

function useCategoryQuery(): UseQueryResult<ICategory[], unknown>;
function useCategoryQuery({ id }: { id?: number | null }): ICategory | null;
function useCategoryQuery(props?: { id?: number | null }) {
  const queryClient = useQueryClient();

  if (!props) {
    return useQuery<ICategory[]>([QUERY_KEY.CATEGORY_KEY], getCategoryAPI, {
      staleTime: 1000 * 60 * 60 * 24,
      onSuccess(data) {
        data.forEach((category) => {
          queryClient.setQueryData(
            [QUERY_KEY.CATEGORY_KEY, { id: category.id }],
            category,
          );
        });
      },
    });
  }

  const { id } = props;

  return (
    queryClient.getQueryData<ICategory>([QUERY_KEY.CATEGORY_KEY, { id }]) ??
    null
  );
}

// 카테고리 추가
let tempId = 0;
const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    // api 호출
    createCategoryAPI,
    {
      onMutate: async (newCategory: ICategoryWithoutId) => {
        // 실패했을 때 복구를 위한 기존 캐시 데이터 가져오기
        const previousCategories = queryClient.getQueryData<ICategory[]>([
          QUERY_KEY.CATEGORY_KEY,
        ]);

        // 낙관적 업데이트를 위한 새로운 데이터 캐싱
        queryClient.setQueryData<ICategory[]>(
          [QUERY_KEY.CATEGORY_KEY],
          (old) => [...(old ?? []), { ...newCategory, id: --tempId }],
        );

        // onError의 context에 들어갈 값
        return { previousCategories, id: tempId };
      },
      // 에러 발생시 원래 캐싱된 데이터로 복구
      onError: (err, newCategory, context) => {
        queryClient.setQueryData<ICategory[]>(
          [QUERY_KEY.CATEGORY_KEY],
          context?.previousCategories ?? [],
        );
      },
      onSuccess: (data, _, context) => {
        queryClient.setQueryData(
          [QUERY_KEY.CATEGORY_KEY, { id: data.id }],
          data,
        );
        queryClient.setQueryData<ICategory[]>(
          [QUERY_KEY.CATEGORY_KEY],
          (oldData) => {
            return [
              ...(oldData?.filter((category) => category.id !== context?.id) ??
                []),
              data,
            ];
          },
        );
      },
    },
  );
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    // api 호출
    updateCategoryAPI,
    {
      onMutate: async (newCategory: ICategory) => {
        const id = newCategory.id;
        // 실패했을 때 복구를 위한 기존 캐시 데이터 가져오기
        const previousCategory = queryClient.getQueryData<ICategory>([
          QUERY_KEY.CATEGORY_KEY,
          { id },
        ]);

        // 낙관적 업데이트를 위한 새로운 데이터 캐싱
        queryClient.setQueryData([QUERY_KEY.CATEGORY_KEY, { id }], newCategory);
        queryClient.setQueryData<ICategory[]>(
          [QUERY_KEY.CATEGORY_KEY],
          (old) => {
            const newCategories = [...(old ?? [])];
            const index = newCategories.findIndex(
              (category) => category.id === newCategory.id,
            );
            newCategories[index] = newCategory;

            return newCategories;
          },
        );

        // onError의 context에 들어갈 값
        return { previousCategory };
      },
      // 에러 발생시 원래 캐싱된 데이터로 복구
      onError: (err, newCategory, context) => {
        const previousCategory = context?.previousCategory;
        if (!previousCategory) return;

        const id = previousCategory.id;
        queryClient.setQueryData(
          [QUERY_KEY.CATEGORY_KEY, { id }],
          previousCategory,
        );
        queryClient.setQueryData<ICategory[]>(
          [QUERY_KEY.CATEGORY_KEY],
          (old) => {
            const previousCategories = [...(old ?? [])];
            const index = previousCategories.findIndex(
              (category) => category.id === newCategory.id,
            );
            previousCategories[index] = previousCategory;

            return previousCategories;
          },
        );
      },
    },
  );
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    // api 호출
    deleteCategoryAPI,
    {
      onMutate: async (targetCategory: ICategory) => {
        const id = targetCategory.id;

        // 실패했을 때 복구를 위한 기존 캐시 데이터 가져오기
        const previousCategory = queryClient.getQueryData<ICategory>([
          QUERY_KEY.CATEGORY_KEY,
          { id },
        ]);

        // 낙관적 업데이트를 위한 새로운 데이터 캐싱
        queryClient.removeQueries([QUERY_KEY.CATEGORY_KEY, { id }]);
        queryClient.setQueryData<ICategory[]>(
          [QUERY_KEY.CATEGORY_KEY],
          (old) => {
            const newCategories = [...(old ?? [])];

            return newCategories.filter(
              (category) => category.id !== targetCategory.id,
            );
          },
        );

        // onError의 context에 들어갈 값
        return { previousCategory };
      },
      // 에러 발생시 원래 캐싱된 데이터로 복구
      onError: (err, targetCategory, context) => {
        const previousCategory = context?.previousCategory;
        if (!previousCategory) return;

        const id = previousCategory.id;
        queryClient.setQueryData(
          [QUERY_KEY.CATEGORY_KEY, { id }],
          previousCategory,
        );
        queryClient.setQueryData<ICategory[]>(
          [QUERY_KEY.CATEGORY_KEY],
          (old) => [...(old ?? []), previousCategory],
        );
      },
    },
  );
};

export {
  useCategoryQuery,
  useUpdateCategory,
  useCreateCategory,
  useDeleteCategory,
};
