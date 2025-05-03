import { EmptyState, VStack } from "@chakra-ui/react"
import { LuShoppingCart } from "react-icons/lu"

const NotFoundView = () => {
    return (
        <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <LuShoppingCart />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>Your cart is empty</EmptyState.Title>
            <EmptyState.Description>
              Explore our products and add items to your cart
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    );
  };
  
  export default NotFoundView;
  