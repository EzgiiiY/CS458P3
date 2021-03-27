import React from "react"
import { shallow } from "enzyme"
import CityLocator from "../CityLocatorButton"

describe("CityLocatorButton", () => {
  let container

  beforeEach(() => {
    container = shallow(
      <CityLocatorButton
        buttonAction={jest.fn()}
        buttonValue={""}
      />
    )
  })
  it("should render a <div />", () => {
    expect(container.find("div").length).toBeGreaterThanOrEqual(1)
  })
})