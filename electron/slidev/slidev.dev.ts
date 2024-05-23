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
          host: '0.0.0.0',
          port: 3030,
        },
      });
      // Wait for the server to be ready
      await server.listen();
      return [true, null]
    } catch (error) {
      console.error('Failed to start Slidev server:', error);
      return [null, { message: 'Failed to start Slidev server', error }]
    }
}