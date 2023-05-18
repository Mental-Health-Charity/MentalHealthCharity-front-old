import ChatSection from '@/common/components/menteePanel/chatSection/ChatSection.component';
import MenteeForm from '@/common/components/menteePanel/form/MenteeForm.component';
import MenteeHero from '@/common/components/menteePanel/menteeHero/MenteeHero.component';

function MenteePanel() {
  return (
    <>
      <MenteeHero />
      <MenteeForm />
      <ChatSection />
    </>
  );
}

export default MenteePanel;
