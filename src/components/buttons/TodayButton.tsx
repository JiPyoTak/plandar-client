import StylishButton from '@/components/buttons/StylishButton';

const TodayButton = () => {
  return (
    <StylishButton
      onClick={() => console.log('오늘')}
      size="small"
      css={{ padding: '8px 16px' }}
    >
      오늘
    </StylishButton>
  );
};
export default TodayButton;
