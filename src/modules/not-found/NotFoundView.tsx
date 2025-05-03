import { Button, EmptyState, List, VStack } from "@chakra-ui/react"
import { HiColorSwatch } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const NotFoundView = () => {
    return (
    <div className="w-full min-h-screen flex justify-center items-center dot-pattern">
      <EmptyState.Root size={"lg"}>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <HiColorSwatch />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>No results found</EmptyState.Title>
            <EmptyState.Description>
              404
            </EmptyState.Description>
          </VStack>
          <List.Root variant="marker" className="text-center">
            <List.Item>Page not found.</List.Item>
            <List.Item>Try checking the url</List.Item>
          </List.Root>
          <NavLink to={"/"}>
            <Button className="bg-[#00ADEE] px-4 py-3 text-white cursor-pointer hover:bg-[#005E9A]">Go back to Home</Button>
          </NavLink>
        </EmptyState.Content>
      </EmptyState.Root>
    </div>
    );
  };
  
  export default NotFoundView;
  