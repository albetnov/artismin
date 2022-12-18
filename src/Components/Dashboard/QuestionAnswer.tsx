import { Code, Heading, ListItem, Pane, UnorderedList } from "evergreen-ui";
import Card from "../Card";
import Question from "./Question";

export default function QuestionAnswer() {
  return (
    <Card>
      <Heading size={700} className="dark:text-white">
        Question and Answer
      </Heading>
      <br />
      <Pane className="flex flex-col gap-10 lg:grid lg:grid-cols-3">
        <Question title="Why are some changes not live?">
          You may have realize that sometime changes you&apos;ll made in this website will not apply
          to the bot. This happen due to caching mechanism. And lucky enough that this only applies
          to: channels and roles as both of them didn&apos;t change frequently. The cache however
          will not revalidate by it&apos;s own. It&apos;s require server restart. But, this action
          is not neccessary with the RefreshCache dev command. You can simply type{" "}
          <Code className="dark:text-white">/dev</Code>
          and then <Code className="dark:text-white">Artisan:RefreshCache</Code> and the bot will
          revalidate the cache right away. Luckily this behaviour can be triggered with Webhook.
        </Question>
        <Question title="Why i should avoid registering channel for autocomplete schedules?">
          I believe you will ask this question if you&apos;re seeing the alert of enabling same
          channels as kernels. As you might already aware, adding channels is not neccessary if
          you&apos;re not a developer. Adding these channel simply allow developer to access these
          channel which by then have some configuration to be done and also allowing the bot to
          cache it later. As far as you don&apos;t need them in the bot kernels. Please remove them.
          It will mess with the cache instead of faster with caching. You&apos;ll make it slow.
        </Question>
        <Question title="Should i use schedule with closest time as possible?">
          For god sake, don&apos;t do it. Did you know what schedule really mean is? You better
          learn more about that vocalbulary. Don&apos;t make your teacher dissapointed. With that
          being said, if you need the bot to simply sent a message you may can wait for the Webhook
          feature to arrive. As it&apos;s simply allow you to do that.
        </Question>
        <Question title="Why i can't add to roles, and channels?">
          You only allowed to edit them. Not adding them. Unless you are a developer. Please contact
          me in regards about those. I&apos;ll tell you what it can do.
        </Question>
        <Question title="What is Welcome, Bye, and Rules listed in channels?">
          Those are the settings for your bot. As you might already aware from the name itself.
          WelcomeChannel simply a channel where the bot going to welcoming the user. So on for bye
          and rules. In the future, this behaviour can be turned off.
        </Question>
        <Question title="What is starting and user listed in roles?">
          After your user joined your channel, before they finally can gain access to &quot;User
          Only&quot; channels. They need to agree to a rules. After that the bot will give them user
          roles. As for starting. The bot will give it when a brand new user or a user that still
          not agree to a rules, a Starting role. In the future, this behaviour can be turned off.
        </Question>
        <Question title="What upcoming feature you wil bring?">
          I can&apos;t guarantee if these feature will 100% come. As I got a lot things going on
          already. However I do have a plan for this in priority:
          <UnorderedList textAlign="left">
            <ListItem className="dark:text-white">Cross Guild Feature</ListItem>
            <ListItem className="dark:text-white">Webhook</ListItem>
            <ListItem className="dark:text-white">Enable and Disable Feature (Flagging)</ListItem>
          </UnorderedList>
          And for the rest:
          <UnorderedList textAlign="left">
            <ListItem className="dark:text-white">Add Ecchi Option</ListItem>
            <ListItem className="dark:text-white">Allows send message directly</ListItem>
          </UnorderedList>
        </Question>
      </Pane>
    </Card>
  );
}
