import { useStore } from "@/store";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { toaster } from '@/components/ui/toaster';

export const AlertDialog = () => {
  const { isAlert, closeAlert, deleteTodoId, deleteTodo } = useStore();

  const handleClose = () => {
    closeAlert();
  }

  const handleDelete = () => {
    deleteTodo(deleteTodoId);
    toaster.create({
            title: 'Task deleted',
            type: 'success',
            duration: 2000,
          });
    closeAlert();
  }

  return (
    <Dialog.Root 
      role="alertdialog"
      placement="center"
      motionPreset="slide-in-bottom"
      lazyMount
      open={isAlert}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <Dialog.Header>
              <Dialog.Title className="text-xl font-semibold text-red-500">Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                This action cannot be undone. This will permanently delete your task.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" className="px-4 bg-gray-200 font-semibold hover:bg-gray-300 text-gray-600 hover:text-gray-700" onClick={handleClose}>Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" className="px-4 bg-red-500 font-semibold hover:bg-red-600 text-white" onClick={handleDelete}>Delete</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={handleClose}/>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
