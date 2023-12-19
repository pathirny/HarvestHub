import { render, screen } from '@testing-library/react'
import Header from "../Header"

describe("header", ()=> {

it("should render the title passed in as props", async ()=>{
    render(<Header title="testing header"/>)

    const headerTitle = screen.getByLabelText('page-title')

    expect(headerTitle).toHaveTextContent("testing header")
})
})