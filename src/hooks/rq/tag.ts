import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ITag, ITagWithoutId } from '@/types/rq/tag';
import { TAG_MOCK } from '@/utils/mock';
import { TAG_KEY } from '@/utils/rqKeys';

// 카테고리 캐싱을 위한 키
const KEY = [TAG_KEY];
const useTagQuery = () => {
  const queryClient = useQueryClient();
  // 첫번째 인자: 쿼리 키
  // 두번째 인자: 데이터를 가져오는 비동기 함수
  return useQuery(KEY, async () => {
    // 원래는 api를 호출해야하지만 **임시적**으로 아래와 같이 사용

    const tags = queryClient.getQueryData<ITag[]>(KEY);

    // 첫 호출 시에는 캐싱된 데이터가 없으므로 mock 데이터를 반환
    if (!tags) {
      return [...TAG_MOCK];
    }
    // 캐싱된 데이터에서 id === -1 인 것만 찾아서 새로운 id를 부여
    else {
      return tags.map((tag) => {
        if (tag.id === -1) {
          return {
            ...tag,
            id: Math.max(...tags.map((tag) => tag.id)) + 1,
          };
        }
        return tag;
      });
    }
  });
};

// 카테고리 추가
const useTagCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(
    // api 호출
    (newTag: ITagWithoutId) => {
      return new Promise<ITagWithoutId>((resolve) => {
        setTimeout(() => {
          resolve(newTag);
        }, 100);
      });
    },
    {
      onMutate: async (newTag: ITagWithoutId) => {
        // 기존 캐싱된 데이터 무효화
        await queryClient.cancelQueries(KEY);

        // 실패했을 때 복구를 위한 기존 캐시 데이터 가져오기
        const previousTags = queryClient.getQueryData<ITag[]>(KEY);

        // 낙관적 업데이트를 위한 새로운 데이터 캐싱
        // id는 임의로 -1로 설정
        queryClient.setQueryData<ITag[]>(KEY, (old) => [
          ...(old ?? []),
          { ...newTag, id: -1 },
        ]);

        // onError의 context에 들어갈 값
        return { previousTags };
      },
      // 에러 발생시 원래 캐싱된 데이터로 복구
      onError: (err, newTag, context) => {
        queryClient.setQueryData<ITag[]>(KEY, context?.previousTags ?? []);
      },
      // 성공했을 때 (새 카테고리의 id를 알기 위해) 캐싱된 데이터 무효화 -> useQuery의 refetch
      onSettled: () => {
        queryClient.invalidateQueries(KEY);
      },
    },
  );
};

const useTagUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(
    // api 호출
    (newTag: ITag) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(newTag);
        }, 100);
      });
    },
    {
      onMutate: async (newTag: ITag) => {
        // 기존 캐싱된 데이터 무효화
        await queryClient.cancelQueries(KEY);

        // 실패했을 때 복구를 위한 기존 캐시 데이터 가져오기
        const previousTags = queryClient.getQueryData<ITag[]>(KEY);

        // 낙관적 업데이트를 위한 새로운 데이터 캐싱
        queryClient.setQueryData<ITag[]>(KEY, (old) => {
          const newTags = [...(old ?? [])];
          const index = newTags.findIndex((tag) => tag.id === newTag.id);
          newTags[index] = newTag;
          return newTags;
        });

        // onError의 context에 들어갈 값
        return { previousTags };
      },
      // 에러 발생시 원래 캐싱된 데이터로 복구
      onError: (err, newTag, context) => {
        queryClient.setQueryData<ITag[]>(KEY, context?.previousTags ?? []);
      },
      // Update 성공시 캐싱된 데이터를 무효화할 필요 없다고 판단하여 onSettled 작성하지 않음
    },
  );
};

export { useTagQuery, useTagCreate, useTagUpdate };
