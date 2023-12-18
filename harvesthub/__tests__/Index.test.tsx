import {render, screen} from "@testing-library/react"
import Index from "@/app/page"
import { createBrowserClient } from "@supabase/ssr";

jest.mock('@supabase/ssr')
jest.mock('../components/hooks/useCheckSignedIn', () => {
    return jest.fn(() => [true]);
  });

describe('Home', ()=>{
    fit('Page should have text - Growing Calendar - on page', async ()=> {
        
        //arrange for the test
        render(<Index />)
    
        //action 
        const myElm =  screen.getByText('Growing Calendar')
    
        //ascertain
        expect(myElm).toBeInTheDocument()
        
    })
})