import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteModalProps {
  name: string | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteModalProps> = ({
  name,
  isOpen,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-500">{name}</span>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className="cursor-pointer">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteConfirmationModal;
