import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Link,
} from "@chakra-ui/react";
import {CloseIcon } from '@chakra-ui/icons'
import { gardeningTipsType } from "@/app/tips-and-tricks/renderTips";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";

// defines prperties of TipCardtip
interface TipCardtip {
  tip: gardeningTipsType;
}
export const YourTipCard: React.FC<TipCardtip> = ({ tip, setDeleted }) => {
  // connects to supabase
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  // sets state (if tip is favourited or not)

  function deleteTip(id: number) {
    async function apiCall(idIn : number) {
      const { error } = await supabase
        .from("tips")
        .delete()
        .eq("id", idIn);
      if (error) {
        console.log(error);
      }
      setDeleted(id)
    }
    apiCall(id);
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
                alignItems="center"
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
          onClick={()=>{deleteTip(tip.id)}}
          className="favButton"
          icon={<CloseIcon />}
        />
      </div>
    </>
  );
};
