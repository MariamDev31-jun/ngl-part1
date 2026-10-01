 class Logger {
  constructor() {
      if(!Logger.instance) {
          Logger.instance=this;
      }
     return Logger.instance
  }
    log(level,message,metadata={}){
        let messageObj={
            level:level,
            message:message,
            timestamp:new Date().toISOString(),
            ...metadata
        }
        console.log(JSON.stringify(messageObj));
    }
    info(message,metadata={}){
        this.log("info",message,metadata);
    }
    error(message,metadata={}){
        this.log("error",message,metadata);
    }
    debug(message,metadata={}){
        this.log("debug",message,metadata);
    }
}
export const logger = new Logger();