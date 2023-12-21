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

// defines prperties of TipCardtip
interface TipCardtip {
  tip: gardeningTipsType;
}
export const TipCard: React.FC<TipCardtip> = ({ tip }) => {
  // connects to supabase
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  // sets state (if tip is favourited or not)
  const [favourited, setFavourited] = useState(false);

  useEffect(() => {
    async function apiCall(idIn: number) {
      console.log(idIn);
      //checks if tip is in the favourties page and render empty heart if its not there, and filled heart if it is
      let { data: favourites, error } = await supabase
        .from("favourites")
        .select("tip_id")
        .eq("tip_id", idIn);

      if (favourites) {
        if (favourites.length > 0) {
          setFavourited(true);
        }
      }
      // if (error) {
      //   console.log(error);
      // }
    }

    apiCall(tip.id);
  }, []);
  // adds selected tip to user's favourited list
  function favTip() {
    async function apiCall(idIn: any) {
      const id = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("favourites")
        .insert([{ user_id: id.data.user?.id, tip_id: tip.id }])
        .select();

      setFavourited(true);
      if (error) {
        console.log(error);
        if (error.code == "23505") {
          const { error } = await supabase
            .from("favourites")
            .delete()
            .eq("tip_id", idIn);
          if (error) {
            console.log(error);
          }
          setFavourited(false);
        }
      }
    }

    apiCall(tip.id);
  }
  // renders tip card
  return (
    <>
      <div id="tip-container" key={tip.id}>
        <Link href={`./tips-and-tricks/${tip.id}`}>
          <Card className="TipCard" maxW="md" borderRadius={10}>
            <CardHeader className="tipsFlexContainer">
              <Flex
                className="individualCards"
                flex="1"
                gap="4"
                alignItems="start"
                flexWrap="wrap"
              >
                <Heading size="sm" style={{ margin: "0" }}>
                  {tip.title}
                </Heading>
                <CardBody id="tip-description">
                  <p>{tip.description}</p>
                </CardBody>
              </Flex>
            </CardHeader>
          </Card>
        </Link>

        <IconButton
          style={{ margin: "0" }}
          aria-label="Add to favourites"
          onClick={favTip}
          className="favButton"
          icon={favourited ? <FaHeartCircleCheck /> : <CiHeart />}
        />
      </div>
    </>
  );
};
