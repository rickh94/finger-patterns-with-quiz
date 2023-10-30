import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'preact';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ScalesButton from './ScalesButton';

export default function IndexNavMenu() {
  return (
    <div class="absolute right-0 top-0 m-4">
      <div class="hidden flex-col items-end gap-y-1 xl:flex">
        <NavLinks />
      </div>
      <Menu as="div" className="relative inline-block text-right">
        {({ open }: { open: boolean }) => (
          <>
            <div>
              <Menu.Button classname="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-all">
                {open ? (
                  <>
                    <XMarkIcon className="inline h-6 w-6 text-fuchsia-800 xl:hidden" />
                    <div class="sr-only">Close Nav Menu</div>
                  </>
                ) : (
                  <>
                    <Bars3Icon className="inline h-6 w-6 text-fuchsia-800 xl:hidden" />
                    <div class="sr-only">Open Nav Menu</div>
                  </>
                )}{' '}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right space-y-2 rounded-lg bg-white px-2 pb-4 pt-2 shadow-md">
                <NavLinks />
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}

function NavLinks() {
  return (
    <>
      <div class="flex justify-end">
        <ScalesButton className="border-b-2 border-fuchsia-600 pb-0 hover:text-fuchsia-800">
          Scales
        </ScalesButton>
      </div>
      <div class="flex justify-end">
        <a
          href="/quiz"
          class="border-b-2 border-fuchsia-600 hover:text-fuchsia-800"
        >
          Test Your Knowledge
        </a>
      </div>
      <div class="flex justify-end">
        <a
          href="/practice"
          class="border-b-2 border-fuchsia-600 hover:text-fuchsia-800"
        >
          Practice Playing
        </a>
      </div>
      <div class="flex justify-end">
        <a
          href="/about"
          class="border-b-2 border-fuchsia-600 hover:text-fuchsia-800"
        >
          About
        </a>
      </div>
    </>
  );
}
