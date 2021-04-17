import React from "react"
import { shallow } from "enzyme"
import GeoLocatorButton from "../GeoLocatorButton"

describe("GeoLocatorButton", () => {
  let container

  beforeEach(() => {
    container = shallow(
      <GeoLocatorButton
        buttonAction={jest.fn()}
        buttonValue={""}
      />
    )
  })
  it("should render a <Button />", () => {
    expect(container.find("Button").length).toBeGreaterThanOrEqual(1)
  })
})