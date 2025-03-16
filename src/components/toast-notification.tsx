'use client';

import { CircleCheck, CircleX, Info, Megaphone, TriangleAlert } from 'lucide-react';

import { ExternalToast, toast as sonnerToast } from 'sonner';

import { Spinner } from './spinner';

export function toast(message: string, options?: ExternalToast) {
  return sonnerToast(<div className="tracking-wide">{message}</div>, options);
}

toast.message = function (message: string, options?: ExternalToast) {
  return sonnerToast.message(
    <div className="flex items-center gap-2 tracking-wide">
      <Megaphone className="stroke-gray-800" />
      <div className="flex flex-col">
        <div className="text-gray-800">{message}</div>
        <div className="text-gray-500">{options?.description?.toString()}</div>
      </div>
    </div>,
    options,
  );
};

toast.info = function (message: string, options?: ExternalToast) {
  return sonnerToast.info(
    <div className="flex items-center gap-2">
      <Info className="fill-current stroke-blue-200" />
      <div className="tracking-wide">{message}</div>
    </div>,
    options,
  );
};

toast.success = function (message: string, options?: ExternalToast) {
  return sonnerToast.success(
    <div className="flex items-center gap-2">
      <CircleCheck className="fill-current stroke-green-200" />
      <div className="tracking-wide">{message}</div>
    </div>,
    options,
  );
};

toast.warning = function (message: string, options?: ExternalToast) {
  return sonnerToast.warning(
    <div className="flex items-center gap-2">
      <TriangleAlert className="fill-current stroke-amber-200" />
      <div className="tracking-wide">{message}</div>
    </div>,
    options,
  );
};

toast.error = function (message: string, options?: ExternalToast) {
  return sonnerToast.error(
    <div className="flex items-center gap-2">
      <CircleX className="fill-current stroke-red-200" />
      <div className="tracking-wide">{message}</div>
    </div>,
    options,
  );
};

toast.loading = function (message: string, options?: ExternalToast) {
  return sonnerToast.loading(
    <div className="flex items-center gap-2">
      <Spinner className="text-gray-600" />
      <div className="tracking-wide">{message}</div>
    </div>,
    options,
  );
};

toast.dismiss = function (id: string | number) {
  sonnerToast.dismiss(id);
};
