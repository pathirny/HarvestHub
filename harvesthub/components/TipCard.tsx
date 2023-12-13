import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Flex,
  Box,
  Heading,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { CiHeart } from "react-icons/ci";
import { gardeningTipsType } from "@/app/TipsnTricks/renderTips";
import { createBrowserClient } from "@supabase/ssr";
// 1 - Style card with border etc.
// 2 - Create a data.json file in same folder as tnt
// 3 - Create a function to map through the array of tips and render a card for each one
// 4 - Add search bar

interface TipCardtip {
  tip: gardeningTipsType;
}

export const TipCard: React.FC<TipCardtip> = ({ tip }) => {

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

function favTip() {

async function apiCall(){

  console.dir(tip)

  const id = await supabase.auth.getUser();
  if (id) {
    console.log(id.data.user?.id);
  }

  const { data, error } = await supabase
  .from('favourites')
  .insert([
    {user_id: id.data.user?.id, tip_id: tip.id },
  ])
  .select()
if(error){
  console.log(error)
} else if (data){
  console.log(data)
}

}

apiCall()
  
}


  return (
    <Link href={`./TipsnTricks/${tip.id}`}>
      <Card className="TipCard" maxW="md" borderRadius={10}>
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="sm">{tip.title}</Heading>
                <Text>{tip.author}</Text>
              </Box>
            </Flex>
            <IconButton aria-label="Add to favourites" onClick={favTip} icon={<CiHeart />} />
          </Flex>
        </CardHeader>
        <CardBody>
          {/* <Text>
            With Chakra UI, I wanted to sync the speed of development with the
            speed of design. I wanted the developer to be just as excited as the
            designer to create a screen.
          </Text> */}
        </CardBody>
      </Card>
  </Link>
  );
};
