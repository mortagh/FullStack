import { Request, Response, NextFunction } from 'express';

export const logHandler = (req: Request, res: Response, next: NextFunction) => {
  const start = new Date();
  const dateIso = start.toISOString();
  
  res.on('finish', () => {
    const duration = new Date().getTime() - start.getTime();
    const statusMsg = res.statusMessage ? ` - ${res.statusMessage}` : '';
    console.log(`[${dateIso}] ${req.method} ${req.originalUrl} - ${res.statusCode}${statusMsg} - time: ${duration}ms`);
  });
  
  next();
};