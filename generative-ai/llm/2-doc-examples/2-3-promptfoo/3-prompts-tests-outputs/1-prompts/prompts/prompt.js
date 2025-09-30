module.exports.promptFunc = async function ({ vars }) {
    return [
      {
        role: 'system',
        content: `You're a translator. Your task is translate your input to French.`,
      },
      {
        role: 'user',
        content: `${vars.text}`,
      },
    ];
  };