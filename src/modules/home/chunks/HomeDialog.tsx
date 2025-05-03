import { useState, useEffect } from 'react';
import { Button, CloseButton, Dialog, Portal, Input, Textarea, Field } from '@chakra-ui/react';
import { useStore } from '@/store';
import { toaster } from '@/components/ui/toaster';

const TodoDialog = () => {
  const { addTodo, editTodo, openLoader, hideLoader, editTodoItem, isOpen, closeDialog, clearEditTodo } = useStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ title: false });

  useEffect(() => {
    if (editTodoItem) {
      setTitle(editTodoItem.title);
      setDescription(editTodoItem.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
    setErrors({ title: false });
  }, [editTodoItem, isOpen]);

  const validate = () => {
    const newErrors = { title: !title.trim() };
    setErrors(newErrors);
    return !newErrors.title;
  };

  const handleSubmit = () => {
    openLoader();
    setTimeout(() => {
    }, 2000);
    if (!validate()) {
      toaster.create({
        title: 'Validation Error',
        description: 'Title is required',
        type: 'error',
        duration: 3000,
      });
      hideLoader();
      return;
    }

    if (editTodoItem) {
      editTodo(editTodoItem.id, {
        title,
        description: description.trim() || undefined,
      });
      toaster.create({
        title: 'Task updated',
        type: 'success',
        duration: 2000,
      });
    } else {
      addTodo({
        title,
        description: description.trim() || '',
        status: 'todo',
      });
      toaster.create({
        title: 'Task added',
        type: 'success',
        duration: 2000,
      });
    }
    
    hideLoader();
    closeDialog();
  };
  
  const handleClose = () => {
    clearEditTodo();
    closeDialog();
  };

  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-bottom"
      lazyMount
      open={isOpen}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <Dialog.Header>
              <Dialog.Title className="text-xl font-semibold text-[#005E9A]">
                {editTodoItem ? 'Edit Task' : 'Add New Task'}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Title <span className='text-red-500'>*</span>
                </label>
                <Field.Root invalid={errors.title}>
                    <Input
                    id="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setErrors({ ...errors, title: false });
                    }}
                    placeholder="Task title"
                    className={`w-full px-3 border ${errors.title ? 'border-red-500' : ''}`}
                    />
                    <Field.ErrorText>Title is required</Field.ErrorText>
                </Field.Root>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Description (optional)
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task description"
                  className="w-full px-3 border"
                  rows={4}
                />
              </div>
            </Dialog.Body>
            <Dialog.Footer className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="px-4 bg-gray-200 font-semibold hover:bg-gray-300 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </Button>
              <Button
                colorScheme={editTodoItem ? 'blue' : 'green'}
                onClick={handleSubmit}
                className={`px-4 text-white font-semibold ${editTodoItem ? 'bg-blue-500 hover:bg-blue-400' : 'bg-green-500 hover:bg-green-400 hover:text-gray-500'} `}
              >
                {editTodoItem ? 'Update Task' : 'Add Task'}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={handleClose} className="absolute top-2 right-2 hover:scale-125" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default TodoDialog;