import { lazy } from 'react';
import { DefaultFallback, ErrorFallback } from '../ui';

const getErrorMessage = (error) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export function lazyImport(
  importFn,
  componentName,
  filePath,
  FallbackComponent,
) {
  return lazy(() =>
    importFn()
      .then((module) => {
        const Component = module?.[componentName];
        if (Component) {
          return { default: Component };
        }

        const availableExports = Object.keys(module ?? {});
        console.error(
          `❌ Ошибка: Компонент "${componentName}" не найден в модуле "${filePath}"`,
          `Доступные экспорты: ${availableExports.join(', ')}`,
        );

        const MissingExportFallback = FallbackComponent ?? DefaultFallback;

        return {
          default: function MissingExportFallbackWrapper() {
            return (
              <MissingExportFallback
                componentName={componentName}
                filePath={filePath}
                availableExports={availableExports}
              />
            );
          },
        };
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error);
        console.error(
          `❌ Ошибка при загрузке модуля "${filePath}":`,
          errorMessage,
        );

        return {
          default: function ImportErrorFallbackWrapper() {
            return (
              <ErrorFallback filePath={filePath} errorMessage={errorMessage} />
            );
          },
        };
      }),
  );
}
