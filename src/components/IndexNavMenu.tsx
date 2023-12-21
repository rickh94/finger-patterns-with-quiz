import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "preact";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ScalesButton from "~/components/ScalesButton";
import Link from "~/components/Link";

export default function IndexNavMenu() {
  return (
    <div class="absolute right-0 top-0 m-4">
      <Menu as="div" className="relative inline-block text-right">
        {({ open }: { open: boolean }) => (
          <>
            <Menu.Button
              as="button"
              className="flex gap-1 rounded text-fuchsia-800 transition-all focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
            >
              {open ? (
                <>
                  Menu
                  <XMarkIcon className="inline size-6" />
                  <div class="sr-only">Close Nav Menu</div>
                </>
              ) : (
                <>
                  Menu
                  <Bars3Icon className="inline size-6" />
                  <div class="sr-only">Open Nav Menu</div>
                </>
              )}{" "}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="ul"
                className="absolute right-0 mt-2 w-48 origin-top-right list-none space-y-2 rounded-lg bg-white px-2 pb-4 pt-2 shadow-md"
              >
                <Menu.Item
                  as="li"
                  class="flex justify-end focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
                >
                  <ScalesButton autoFocus={true}>
                    <span className="border-b-2 border-fuchsia-600 pb-0 hover:text-fuchsia-800">
                      Scales
                    </span>
                  </ScalesButton>
                </Menu.Item>
                <Menu.Item as="li" class="flex justify-end">
                  <Link href="/quiz">Test Your Knowledge</Link>
                </Menu.Item>
                <Menu.Item as="li" class="flex justify-end">
                  <Link href="/practice">Practice Playing</Link>
                </Menu.Item>
                <Menu.Item as="li" class="flex justify-end">
                  <Link href="/about">About</Link>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}
