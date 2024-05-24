import path from 'path';

export const createSlidevDev = async () => {
  try {
    // Dynamically import the ESM module
    const { createServer, resolveOptions } = await import('@slidev/cli' as string);
    const options = await resolveOptions({ entry: path.resolve(process.cwd(), 'slidev/slides.md') }, 'dev');
    // Start Slidev server
    const server = await createServer(options, {
      server: {
        open: false,
        strictPort: true,
        port: 3030,
      },
    });
    // Wait for the server to be ready
    await server.listen();
  } catch (error) {
    console.error('Failed to start Slidev server:', error);
  }
}