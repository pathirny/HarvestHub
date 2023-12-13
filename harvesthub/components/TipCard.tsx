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
import { gardeningTipsType } from "@/app/tips-and-tricks/renderTips";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
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
    async function apiCall() {
      console.dir(tip);

      const id = await supabase.auth.getUser();
      if (id) {
        console.log(id.data.user?.id);
      }

      const { data, error } = await supabase
        .from("favourites")
        .insert([{ user_id: id.data.user?.id, tip_id: tip.id }])
        .select();
      if (error) {
        console.log(error);
      } else if (data) {
        console.log(data);
      }
    }

    apiCall();
  const [favourited, setFavourited] = useState(false)

useEffect(()=>{

async function apiCall(idIn : number) {
  console.log(idIn)
  //checks if tip is in the favourties page and render empty heart if its not there, and filled heart if it is
let { data: favourites, error } = await supabase
  .from('favourites')
  .select('tip_id')
  .eq('tip_id', idIn )

  if(favourites){
    if(favourites.length > 0){

  setFavourited(true)}
  }
  if(error){
    console.log(error)
  }
}

apiCall(tip.id)

}, [])

function favTip() {

async function apiCall(idIn : any){

  const id = await supabase.auth.getUser();

  const { data, error } = await supabase
  .from('favourites')
  .insert([
    {user_id: id.data.user?.id, tip_id: tip.id },
  ])
  .select()

  setFavourited(true)
if(error){
  console.log(error)
  if(error.code == '23505'){
    const { error } = await supabase
        .from("favourites")
        .delete()
        .eq("tip_id", idIn);
      if (error) {
        console.log(error);
      }
      setFavourited(false)
  }
}

}

apiCall(tip.id)
  
}


  return (<>
  <div id="tip-container" key={tip.id}>
    <Link href={`./TipsnTricks/${tip.id}`}>
      <Card className="TipCard" maxW="md" borderRadius={10}>
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="sm" style={{margin: "0"}}>{tip.title}</Heading>
                <Text style={{margin: "0"}}>{tip.author}</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody id="tip-description">
          <Text>
            With Chakra UI, I wanted to sync the speed of development with the
            speed of design. I wanted the developer to be just as excited as the
            designer to create a screen.
          </Text>
        </CardBody>
      </Card>
  </Link>
  
        <IconButton style={{margin: "0"}} aria-label="Add to favourites" onClick={favTip} icon={ favourited ? <FaHeartCircleCheck /> :  <CiHeart /> } />
  </div>
  </>
  );
};
