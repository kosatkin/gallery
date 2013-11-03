<?php

class Board_Model_Exception extends Core_Model_Exception {
    const INVALID_PATH = 1;

    protected static $messages = array(
        self::INVALID_PATH => 'Invalid path'
    );

    public function __construct($code) {
        if(!isset(self::$messages[$code])) {
            throw new InvalidArgumentException('Invalid code');
        }
        parent::__construct(self::$messages[$code], $code, $this);
    }
}