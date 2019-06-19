import React from "react";
import styled from "styled-components";
import ListBox from "../../src";

export const Basic = () => (
  <ListBox isMulti>
    <ListBox.Option>Punisher</ListBox.Option>
    <ListBox.Option>Catwoman</ListBox.Option>
    <ListBox.Option>Venom</ListBox.Option>
    <ListBox.Option>Thunderbolts</ListBox.Option>
    <ListBox.Option>Deadpool</ListBox.Option>
    <ListBox.Option>Spawn</ListBox.Option>
    <ListBox.Option>Wolverine</ListBox.Option>
  </ListBox>
);

export const BasicWithPreselectedOptions = () => (
  <ListBox isMulti isPopoverOpen>
    <ListBox.Option>Punisher</ListBox.Option>
    <ListBox.Option>Catwoman</ListBox.Option>
    <ListBox.Option isSelected>Venom</ListBox.Option>
    <ListBox.Option isSelected>Thunderbolts</ListBox.Option>
    <ListBox.Option>Deadpool</ListBox.Option>
    <ListBox.Option>Spawn</ListBox.Option>
    <ListBox.Option isSelected>Wolverine</ListBox.Option>
  </ListBox>
);

export const BasicIsDisabled = () => (
  <ListBox isMulti isDisabled>
    <ListBox.Option>Punisher</ListBox.Option>
    <ListBox.Option>Catwoman</ListBox.Option>
    <ListBox.Option>Venom</ListBox.Option>
    <ListBox.Option>Thunderbolts</ListBox.Option>
    <ListBox.Option>Deadpool</ListBox.Option>
    <ListBox.Option>Spawn</ListBox.Option>
    <ListBox.Option>Wolverine</ListBox.Option>
  </ListBox>
);

export const BasicIsDisabledWhileOpen = () => (
  <ListBox isMulti isDisabled isPopoverOpen>
    <ListBox.Option>Punisher</ListBox.Option>
    <ListBox.Option>Catwoman</ListBox.Option>
    <ListBox.Option>Venom</ListBox.Option>
    <ListBox.Option>Thunderbolts</ListBox.Option>
    <ListBox.Option>Deadpool</ListBox.Option>
    <ListBox.Option>Spawn</ListBox.Option>
    <ListBox.Option>Wolverine</ListBox.Option>
  </ListBox>
);

export const WithCheckboxAsPreBuiltInOption = () => (
  <ListBox isMulti renderCheckbox="checkbox">
    <ListBox.Option>Punisher</ListBox.Option>
    <ListBox.Option>Catwoman</ListBox.Option>
    <ListBox.Option>Venom</ListBox.Option>
    <ListBox.Option>Thunderbolts</ListBox.Option>
    <ListBox.Option>Deadpool</ListBox.Option>
    <ListBox.Option>Spawn</ListBox.Option>
    <ListBox.Option>Wolverine</ListBox.Option>
  </ListBox>
);

export const Footer = () => (
  <ListBox isMulti>
    <ListBox.Option>Punisher</ListBox.Option>
    <ListBox.Option>Catwoman</ListBox.Option>
    <ListBox.Option>Venom</ListBox.Option>
    <ListBox.Option>Thunderbolts</ListBox.Option>
    <ListBox.Option>Deadpool</ListBox.Option>
    <ListBox.Option>Spawn</ListBox.Option>
    <ListBox.Option>Wolverine</ListBox.Option>
    <ListBox.Footer
      onClickAccept={(indexes, options) => {
        console.log(indexes);
        console.log(options);
      }}
    />
  </ListBox>
);

export const WithCustomCheckers = () => (
  <ListBox
    isMulti
    renderCheckbox={isChecked => {
      return isChecked ? "✅" : "🙅‍";
    }}
  >
    <ListBox.Option>Punisher</ListBox.Option>
    <ListBox.Option>Catwoman</ListBox.Option>
    <ListBox.Option>Venom</ListBox.Option>
    <ListBox.Option>Thunderbolts</ListBox.Option>
    <ListBox.Option>Deadpool</ListBox.Option>
    <ListBox.Option>Spawn</ListBox.Option>
    <ListBox.Option>Wolverine</ListBox.Option>
  </ListBox>
);

export const WithGroups = () => (
  <ListBox isMulti>
    <ListBox.Group groupId="antiheroes" label="Anti-heroes">
      <ListBox.Option>Punisher</ListBox.Option>
      <ListBox.Option>Catwoman</ListBox.Option>
      <ListBox.Option>Venom</ListBox.Option>
      <ListBox.Option>Thunderbolts</ListBox.Option>
      <ListBox.Option>Suicide Squad</ListBox.Option>
      <ListBox.Option>Deadpool</ListBox.Option>
      <ListBox.Option>Spawn</ListBox.Option>
      <ListBox.Option>Wolverine</ListBox.Option>
    </ListBox.Group>
    <ListBox.Group groupId="villians" label="Villians">
      <ListBox.Option>The Joker</ListBox.Option>
      <ListBox.Option>Darth Vader</ListBox.Option>
      <ListBox.Option>Hannibal Lecter</ListBox.Option>
      <ListBox.Option>Lord Voldemort</ListBox.Option>
      <ListBox.Option>Freddy Krueger</ListBox.Option>
      <ListBox.Option>Palpatine</ListBox.Option>
      <ListBox.Option>Agent Smith</ListBox.Option>
    </ListBox.Group>
    <ListBox.Group groupId="heroes" label="Heroes">
      <ListBox.Option>Black Panther</ListBox.Option>
      <ListBox.Option>Wonder Woman</ListBox.Option>
      <ListBox.Option>Spiderman</ListBox.Option>
      <ListBox.Option>The Incredibles</ListBox.Option>
      <ListBox.Option>Thor</ListBox.Option>
      <ListBox.Option>Batman</ListBox.Option>
      <ListBox.Option>Iron Man</ListBox.Option>
      <ListBox.Option>Doctor Strange</ListBox.Option>
    </ListBox.Group>
  </ListBox>
);

const RootStyled = styled.span`
  text-align: left;
  font-weight: bold;
  font-size: 16px;
`;

const ParentStyled = styled.span`
  text-align: left;
  font-weight: 300;
  padding-left: 16px;
  font-size: 14px;
`;

const LeafStyled = styled.span`
  padding-left: 32px;
  position: relative;

  &:before {
    border-bottom: 1px solid #ccc;
    content: "";
    height: 1px;
    position: absolute;
    width: 8px;
    top: 6px;
    left: 20px;
  }

  &:after {
    border-left: 1px solid #ccc;
    content: "";
    height: 8px;
    position: absolute;
    width: 1px;
    top: 0;
    left: 20px;
    display: block;
  }
`;

export const WithCustomStyles = () => (
  <ListBox isMulti renderCheckbox={() => null}>
    <ListBox.RawItem>
      <RootStyled as="span">Marvel Universe</RootStyled>
    </ListBox.RawItem>
    <ListBox.RawItem>
      <ParentStyled as="span">AntiHeroes</ParentStyled>
    </ListBox.RawItem>
    <ListBox.Option>{isChecked => <LeafStyled>{isChecked ? "😇" : "🙅‍"} Render Prop</LeafStyled>}</ListBox.Option>
    <ListBox.Option>
      <LeafStyled>Catwoman</LeafStyled>
    </ListBox.Option>
    <ListBox.Option>
      <LeafStyled>Venom</LeafStyled>
    </ListBox.Option>
    <ListBox.Option>
      <LeafStyled>Thunderbolts</LeafStyled>
    </ListBox.Option>
    <ListBox.Option>
      <LeafStyled>Suicide Squad</LeafStyled>
    </ListBox.Option>
    <ListBox.Option>
      <LeafStyled>Deadpool</LeafStyled>
    </ListBox.Option>
    <ListBox.Option>
      <LeafStyled>Spawn</LeafStyled>
    </ListBox.Option>
    <ListBox.Option>
      <LeafStyled>Wolverine</LeafStyled>
    </ListBox.Option>
  </ListBox>
);

export const WithGroupsAndHaveSelectionByGroups = () => (
  <ListBox isMulti>
    <ListBox.Group groupId="antiheroes" label="👺 antiheroes">
      <ListBox.Option>Punisher</ListBox.Option>
      <ListBox.Option>Catwoman</ListBox.Option>
      <ListBox.Option>Venom</ListBox.Option>
      <ListBox.Option>Thunderbolts</ListBox.Option>
      <ListBox.Option>Suicide Squad</ListBox.Option>
      <ListBox.Option>Deadpool</ListBox.Option>
      <ListBox.Option>Spawn</ListBox.Option>
      <ListBox.Option>Wolverine</ListBox.Option>
    </ListBox.Group>
    <ListBox.Group groupId="villians" label="🔪 Villians">
      <ListBox.Option>The Joker</ListBox.Option>
      <ListBox.Option>Darth Vader</ListBox.Option>
      <ListBox.Option>Hannibal Lecter</ListBox.Option>
      <ListBox.Option>Lord Voldemort</ListBox.Option>
      <ListBox.Option>Freddy Krueger</ListBox.Option>
      <ListBox.Option>Palpatine</ListBox.Option>
      <ListBox.Option>Agent Smith</ListBox.Option>
    </ListBox.Group>
    <ListBox.Group groupId="heroes" label="👩‍🎤 heroes">
      <ListBox.Option>Black Panther</ListBox.Option>
      <ListBox.Option>Wonder Woman</ListBox.Option>
      <ListBox.Option>Spiderman</ListBox.Option>
      <ListBox.Option>The Incredibles</ListBox.Option>
      <ListBox.Option>Thor</ListBox.Option>
      <ListBox.Option>Batman</ListBox.Option>
      <ListBox.Option>Iron Man</ListBox.Option>
      <ListBox.Option>Doctor Strange</ListBox.Option>
    </ListBox.Group>
  </ListBox>
);

export const WithGroupsAndHavePreselectedOptions = () => (
  <ListBox isMulti>
    <ListBox.Group label="antiheroes">
      <ListBox.Option isSelected>Punisher</ListBox.Option>
      <ListBox.Option>Catwoman</ListBox.Option>
      <ListBox.Option isSelected>Venom</ListBox.Option>
      <ListBox.Option>Thunderbolts</ListBox.Option>
      <ListBox.Option>Suicide Squad</ListBox.Option>
      <ListBox.Option>Deadpool</ListBox.Option>
      <ListBox.Option>Spawn</ListBox.Option>
      <ListBox.Option>Wolverine</ListBox.Option>
    </ListBox.Group>
    <ListBox.Group label="villians">
      <ListBox.Option>The Joker</ListBox.Option>
      <ListBox.Option>Darth Vader</ListBox.Option>
      <ListBox.Option>Hannibal Lecter</ListBox.Option>
      <ListBox.Option>Lord Voldemort</ListBox.Option>
      <ListBox.Option isSelected>Freddy Krueger</ListBox.Option>
      <ListBox.Option>Palpatine</ListBox.Option>
      <ListBox.Option>Agent Smith</ListBox.Option>
    </ListBox.Group>
    <ListBox.Group label="heroes">
      <ListBox.Option>Black Panther</ListBox.Option>
      <ListBox.Option>Wonder Woman</ListBox.Option>
      <ListBox.Option>Spiderman</ListBox.Option>
      <ListBox.Option isSelected>The Incredibles</ListBox.Option>
      <ListBox.Option>Thor</ListBox.Option>
      <ListBox.Option>Batman</ListBox.Option>
      <ListBox.Option>Iron Man</ListBox.Option>
      <ListBox.Option>Doctor Strange</ListBox.Option>
    </ListBox.Group>
  </ListBox>
);
