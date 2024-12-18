import { cn } from "@/lib/utils";
import React, {
  MouseEvent,
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ANIMATION_DURATION_MS = 200;

type DialogComponentOptions = {
  collapseWhenClickOutside?: boolean;
};
type DialogComponent = {
  name: string;
  component: ReactElement;
  options?: DialogComponentOptions;
};

type TDialogContextValues = {
  showDialog: (dialogName: string, context?: unknown) => void;
  closeDialog: (options?: { persistBackground?: boolean }) => Promise<void>;
  contextData: unknown;
  isShowing: boolean;
};
const DialogContext = createContext<TDialogContextValues | null>(null);

export type DialogComponents = DialogComponent[];
/*
 * DialogProvider is a context provider that provides a function to display a dialog component.
 * The dialog component is displayed at the center of the screen and can be closed by clicking outside the dialog component.
 */
export function DialogProvider({
  children,
  components,
}: {
  children: ReactNode;
  components: DialogComponent[];
}) {
  // Context data that we can pass into a dialog component.
  // When the user selects a sepcific task, the details from that task if first passed into this context then to the dialog component itself.
  const [contextData, setContextData] = useState<unknown>({});
  const wrapperRef = useRef<null | HTMLDivElement>(null);

  // The options that can be passed into a dialog component.
  const [options, setOptions] = useState<DialogComponentOptions | undefined>();

  // The dialog component that is currently being displayed. Dialog selection is uesd by passing a key (string) that we have defined in the `components` array.
  const [isShowing, setIsShowing] = useState<{
    name: string;
    selectedComponent?: ReactElement;
  }>({
    name: "",
  });

  // Displays a dialog component by passing in the key (string) that we have defined in the `components` array.
  const showDialog = useCallback(
    (dialogName: string, context?: unknown) => {
      // 1. Find the dialog component that matches the key (string) that we have defined in the `components` array.
      const selectedComponent = components.find(
        (component) => component.name === dialogName
      );

      // 2. Throw an error if the user made an error by passing a dialog component string that does not exist.
      if (!selectedComponent)
        throw new Error(
          `Dialog with the name of ${dialogName} does not exist!`
        );

      // 3. If provided, set the context data and options that we have defined in the `components` array.
      if (context) setContextData(context);
      if (selectedComponent.options) setOptions(selectedComponent.options);

      // 5. Set the dialog component that will be displayed.
      setIsShowing((current) => {
        return {
          ...current,
          name: dialogName,
          selectedComponent: selectedComponent.component,
        };
      });
    },
    [components]
  );

  const closeDialog = () => {
    return new Promise<void>((resolve) => {
      // 1. Restore the initial state of the dialog component.
      setIsShowing({
        name: "",
      });
      setContextData({});
      setOptions(undefined);

      // 2. Resolve the promise after the animation duration has passed. This is primarily used to be able to asynchronously perform animations while waiting the for close animation to finish.
      setTimeout(() => {
        resolve();
      }, ANIMATION_DURATION_MS);
    });
  };

  // Close the dialog when the user clicks outside.
  const handleClickOutside = (e: MouseEvent) => {
    e.stopPropagation();

    // Disable the click outside functionality (if requested). This means that the user now needs to use the <DialogCollapse/> component to close the dialog.
    if (
      options &&
      // This makes it so that only if the user explicity state true or false will this guard clause work. Basically making this option true by default
      typeof options.collapseWhenClickOutside === "boolean" &&
      !options.collapseWhenClickOutside
    )
      return;

    // Retrieve the dialog component. Since the dialog component is always the child of `wrapper` then we can use .children[0]. However, do know that because of this, we cannot use <Fragments/> when creating a dialog component.
    const wrapper = wrapperRef.current?.children[0];

    if (!wrapper) return;

    // Checks if the user click outside the bounding rectagnle
    const clickedOutside = !wrapper.contains(e.target as HTMLElement);

    // Components that are built using portals e.g. shadcn's popover lives outside react's root element, we need to make user the user is not clicking on the portal element before closing the dialog.
    const clickedPortalElement = !(e.target as HTMLElement).closest("#root");

    // If the user clicks outside, then close the dialog
    if (clickedOutside && !clickedPortalElement) closeDialog();
  };

  // Exit on esc key hit
  useEffect(() => {
    const handleEscExit = (e: KeyboardEvent) => {
      if (!isShowing || e.key !== "Escape") return;
      closeDialog();
    };

    window.addEventListener("keydown", handleEscExit);
    return () => window.removeEventListener("keydown", handleEscExit);
  }, [isShowing]);

  return (
    <DialogContext.Provider
      value={{
        showDialog,
        closeDialog,
        contextData,
        isShowing: Boolean(isShowing.selectedComponent),
      }}
    >
      <div
        className={cn(
          "fixed inset-0 z-50 opacity-0 invisible bg-black/50 transition-all duration-400 flex items-center justify-center",
          isShowing.selectedComponent && "opacity-1 visible"
        )}
      >
        <div
          className={cn(
            `dialog-content invisible scale-90 transition-all opacity-0 z-20 grid place-items-center min-h-full absolute inset-0`,
            isShowing.selectedComponent && "opacity-1 visible scale-1"
          )}
          onMouseDown={handleClickOutside}
          ref={wrapperRef}
        >
          {isShowing.selectedComponent}
        </div>
      </div>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogCollapse({
  children,
  disabled,
  onClick = () => {},
  ...props
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
} & React.HTMLAttributes<HTMLButtonElement>) {
  const { closeDialog } = useDialog();

  return (
    <button
      disabled={disabled}
      {...props}
      onClick={(e) => {
        closeDialog();
        onClick(e);
      }}
    >
      {children}
    </button>
  );
}

type AssertContextTypeToGenerics<T, V> = {
  [K in keyof V]: K extends "contextData" ? T : V[K];
};

export type DialogNames<T extends DialogComponents> = T[number]["name"];

export function useDialog<ContextTypes = unknown>() {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error(
      "useDialog should be called inside the <DialogProvider/> component"
    );
  return context as AssertContextTypeToGenerics<
    ContextTypes,
    TDialogContextValues
  >;
}
